FROM mcr.microsoft.com/azure-functions/node:4-node20

ENV AzureWebJobsScriptRoot=/home/site/wwwroot \
    AzureFunctionsJobHost__Logging__Console__IsEnabled=true

WORKDIR /home/site/wwwroot

COPY api/package*.json ./
RUN npm install --only=production

COPY api/. .

EXPOSE 80

CMD ["func", "start", "--csharp", "--port", "80"]
