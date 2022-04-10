import json
import boto3
import datetime
import base64
import urllib3

MASTER_USER = 'adminuser'
MASTER_PASSWORD = '1234&Qwer'
DOMAIN_ENDPOINT = 'https://search-photos-cqrdioq663y64lxnqrgjhstgfm.us-east-1.es.amazonaws.com'
INDEX = 'photo'
TYPE = 'Photo'
BASE_URL = '%s/%s/%s' % (DOMAIN_ENDPOINT, INDEX, TYPE)
http = urllib3.PoolManager()


authorization = base64.b64encode(('%s:%s' % (MASTER_USER, MASTER_PASSWORD)).encode('ascii')).decode('ascii')
headers = {
    'Authorization': 'Basic ' + authorization,
    'Content-Type': 'application/json'
}


def add(data, key):
    """
    Add image key and labels data to OpenSearch
    """
    response = http.request("POST", url='%s/%s' % (BASE_URL, key), headers=headers, body=data)
    return


def lambda_handler(event, context):
    # get bucket and keys from S3 object
    bucket = event['Records'][0]['s3']['bucket']['name']
    key = event['Records'][0]['s3']['object']['key']
    
    
    detected_labels_list = detect_labels(key, bucket)
    labels_name_list = [label['Name'].strip().lower() for label in detected_labels_list]
    
    s3 = boto3.client('s3')
    data = s3.head_object(Bucket=bucket, Key=key)
    
    # combine detected labels with user-defined custom labels
    labels = json.loads(data['Metadata']['label']) + labels_name_list
    timestamp = data["LastModified"]
    
    # construct json format data
    response = {
        "objectKey": key,
        "bucket": bucket,
        "createdTimestamp": timestamp,
        "labels": labels,
    }

    res = json.dumps(response, default=str)

    # add data to OpenSearch
    add(res, key)
    return {
        'statusCode': 200,
        'body': res
    }

# AWS Rekognition detect labels
def detect_labels(photo, bucket):
    client=boto3.client('rekognition')
    response = client.detect_labels(Image={'S3Object':{'Bucket':bucket,'Name':photo}}, MaxLabels=10)
    return response['Labels']
