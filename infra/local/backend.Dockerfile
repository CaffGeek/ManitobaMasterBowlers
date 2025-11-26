FROM mcr.microsoft.com/azure-functions/node:4-node20

ENV AzureWebJobsScriptRoot=/home/site/wwwroot \
    AzureFunctionsJobHost__Logging__Console__IsEnabled=true

WORKDIR /home/site/wwwroot

COPY api/package*.json ./
RUN npm install

COPY api/. .

EXPOSE 7071

# Run TypeScript watch in the background and start the Functions host
CMD ["/bin/bash", "-c", "npm run watch & func start --csharp"]
