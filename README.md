# smart-photot-album

## 1. Architecture
![image](https://user-images.githubusercontent.com/49350284/162481178-12d81ad0-c625-4a2c-baef-ef59285a2996.png)


## 2. Procedure

### 2.1 AWS Cloudformation Stack Template
  https://cf-templates-64533atv427d-us-east-1.s3.amazonaws.com/2022099uN7-template1dlwnef2uqbf
  
  The AWS Rekognition service is called inside index-photos lambda function
  
### 2.2 Lambda index-photos (LF1)
    Create a Lambda function with Function name **index-photos** and Runtime Python 3.9.
    Replace code source with **index-photos** and deploy.
    Add AmazonLexFullAccess permission policy to the role of index-photos.

    S3 PutObject event triggers index-photos, which get label data from metadata of S3 the newly put object.
    index-photos uses AWS Rekognition to detect possible labels of the image object, and then combined the detected labels with the user-defined custom labels from metadata, and send the labels and corresponding object keys to OpenSearch for indexing.

### 2.3 API Gateway

    Copy and import API/Swagger specification to API Gateway.
    Choose S3 Bucket **B2** as the integration point.
    Enable CORS for /upload/{bucket}/{key} and /search (Resources -> Actions).
    Deploy API of /upload/{bucket}/{key} and /search (Resources -> Actions) with Stage name prod, generate SDK on platform JavaScript, rename generated SDK folder to sdk and replace smart-photo-album/src/utils/handleImageUpload.js
    Upload frontend folder to the S3 bucket **B1** (Buckets -> Objects).

### 2.4. Lex
    Create a custom bot with bot name SearchPhotoBot, language English (US), output voice Salli, session timeout 1 min, COPPA No.
    Create one intent SearchIntent. See **other/lex.json** for detailed configuration.
    Build and publish the bot with alias Prod.
    
### 2.5 Lambda search-photos (LF2)
    LF2 provides disambiguated search query using Lex and gets S3 object key from OpenSearch based on labels that match the disambiguated query or multi queries.
    Create a Lambda function with Function name **search-photos** and Runtime Python 3.9.
    Replace code source with **LF2** and deploy.
    Add AmazonLexFullAccess and AmazonOpenSearchServiceFullAccess permission policy to the role of LF2.
 
### 2.6 OpenSearch (S2)
    Create a domain with Domain name photos, Version OpenSearch 1.2, Instance type r6g.large.search; Enable fine-grained access control -> Create master user -> Master username adminuser, Master password 1234&Qwer; Network Public access, Access policy Only use fine-grained access control
