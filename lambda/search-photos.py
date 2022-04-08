import json
import boto3
import urllib3
import base64
import datetime
import io
import random
import string


MASTER_USER = 'adminuser'
MASTER_PASSWORD = '1234&Qwer'
DOMAIN_ENDPOINT = 'https://search-photos-cqrdioq663y64lxnqrgjhstgfm.us-east-1.es.amazonaws.com'
INDEX = 'photo'
TYPE = 'Photo'
BASE_URL = '%s/%s/%s' % (DOMAIN_ENDPOINT, INDEX, TYPE)
http = urllib3.PoolManager()
RESULT_SIZE = 10

authorization = base64.b64encode(('%s:%s' % (MASTER_USER, MASTER_PASSWORD)).encode('ascii')).decode('ascii')
headers = {
    'Authorization': 'Basic ' + authorization,
    'Content-Type': 'application/json'
}

def get_random_id():
    # printing lowercase
    letters = string.ascii_lowercase
    return ''.join(random.choice(letters) for i in range(10))

def get_photo(query):
    photo_object_keys = []
    data = {
        'query': {
            'function_score': {
                'query': {
                    'multi_match': {
                        'query': query,
                        'fields': ["labels^4", "objectKey"]
                    }
                },
                'random_score': {}
            }
        },
        'size': RESULT_SIZE
    }
        # 'size': RESULT_SIZE
    response = http.request("GET", url=BASE_URL + '/_search', headers=headers, body=json.dumps(data))
    print(response.data)
    
    for photo in json.loads(response.data)['hits']['hits']:
        photo_object_keys.append('https://smart-photo-album-storage.s3.amazonaws.com/' + photo["_id"])
    
    return photo_object_keys

def lambda_handler(event, context):
    # TODO implement
    userId = "perchance"
    query = event["multiValueQueryStringParameters"]["query"][0]
    print('query: ', query)
    
    try:
        # TODO: write code...
        lex_bot = boto3.client('lex-runtime')
        response = lex_bot.post_text(botName="SearchPhotoBot", botAlias="dev", userId=userId, inputText=query)
        if not response['message']:
            return ''
        
        if response['message'] == '1234&qwer':
            return ''
            
    except Exception:
        return ''
    

    print("response: ", response['message'])
    query_list = [d.strip() for d in response['message'].split(',')]
    object_list = []
    
    for query in query_list:
        object_list.extend(get_photo(query))
    

    return {
        'statusCode': 200,
        'body': json.dumps(object_list),
        'headers': {
            'Access-Control-Allow-Headers' : 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },

    }
