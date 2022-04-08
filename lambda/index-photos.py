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


# data is a dictionary containing keys 'business_id' and 'cuisine'
def add(data, key):
    response = http.request("POST", url='%s/%s' % (BASE_URL, key), headers=headers, body=data)
    print('add data response: ', response)


def lambda_handler(event, context):
    # TODO implement
    
    # data = json.loads(event)
    bucket = event['Records'][0]['s3']['bucket']['name']
    key = event['Records'][0]['s3']['object']['key']
    
    detected_labels_list = detect_labels(key, bucket)
    labels_name_list = [label['Name'].strip().lower() for label in detected_labels_list]
    
    s3 = boto3.client('s3')
    data = s3.head_object(Bucket=bucket, Key=key);
    
    labels = json.loads(data['Metadata']['label']) + labels_name_list
    timestamp = data["LastModified"]
    
    print('labels', labels)
    response = {
        "objectKey": key,
        "bucket": bucket,
        "createdTimestamp": timestamp,
        "labels": labels,
    }
    
    # print(json.dumps(response, default=str))
    res = json.dumps(response, default=str)
    print('res: ', res)
    add(res, key)
    return {
        'statusCode': 200,
        'body': res
    }

def detect_labels(photo, bucket):

    client=boto3.client('rekognition')

    response = client.detect_labels(Image={'S3Object':{'Bucket':bucket,'Name':photo}}, MaxLabels=10)

    # print('Detected labels for ' + photo) 
    # print()   
    # for label in response['Labels']:
    #     print ("Label: " + label['Name'])
    #     print ("Confidence: " + str(label['Confidence']))
    #     print ("Instances:")
    #     for instance in label['Instances']:
    #         print ("  Bounding box")
    #         print ("    Top: " + str(instance['BoundingBox']['Top']))
    #         print ("    Left: " + str(instance['BoundingBox']['Left']))
    #         print ("    Width: " +  str(instance['BoundingBox']['Width']))
    #         print ("    Height: " +  str(instance['BoundingBox']['Height']))
    #         print ("  Confidence: " + str(instance['Confidence']))
    #         print()

    #     print ("Parents:")
    #     for parent in label['Parents']:
    #         print ("   " + parent['Name'])
    #     print ("----------")
    #     print ()
    return response['Labels']
