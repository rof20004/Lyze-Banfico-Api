## AISP built on Banfico FaaS

#### Idea
So you are a fintech and want to build `Open Banking API product`, which will be consumed by your own web or mobile clients or even invite other fintech to subscribe to your API product as a SaaS. Great - let's try to get you quickly build an AISP Product using Banfico's `Fintech as a Service`

#### Bootstrapping on Banfico FaaS
Talk to Banfico's team to get a Platform provisioned for you. The platform offers your below functionalities 
* Identity and Access Management (OAuth2 Compliant)
* API Management
* CI/CD
* Non-functional elements like Logging, Monitoring etc

We will request you to provide a team or product or organisation name to set up a cloud platform.

#### API Product - Open API Specification
`API first approach` - We recommend you to create API specification for your product first or provide us swagger files post-development.

#### API Product Implementation
Use this GitLab repository to implement your APIs - in any popular languages (Node here in this instance).

#### CI/CD
We will support you with CI/CD. The GitLab CI/CD is defined here for this Node project. Once the build is successful, it will be deployed on the cloud. The API product will be deployed here - <https://api.faas-demo.faas.orufin.io> #TODO needs update

#### API Product publication
a. Login into API Manager Portal and publish your API product
b. Login into Developer Portal to create an application and subscribe to your API product
c. Consume the API product using your API App; test the APIs on the developer portal

#### Build your Web/Mobile Client
With API product fully published, tested on the Developer portal, start building your frontend web/mobile clients

