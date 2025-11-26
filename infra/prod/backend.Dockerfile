FROM mcr.microsoft.com/azure-functions/node:4-node20

ENV AzureWebJobsScriptRoot=/home/site/wwwroot/dist \
    AzureFunctionsJobHost__Logging__Console__IsEnabled=true

WORKDIR /home/site/wwwroot

# Install .NET SDK (needed by the Functions host/extension bundle)
RUN apt-get update \
    && apt-get install -y wget gnupg \
    && wget https://packages.microsoft.com/config/debian/12/packages-microsoft-prod.deb -O packages-microsoft-prod.deb \
    && dpkg -i packages-microsoft-prod.deb \
    && rm packages-microsoft-prod.deb \
    && apt-get update \
    && apt-get install -y dotnet-sdk-8.0 \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

COPY api/package*.json ./
RUN npm install --only=production && npm install -g azure-functions-core-tools@4 --unsafe-perm true

COPY api/. .

RUN npm run build

EXPOSE 80

CMD ["func", "start", "--javascript", "--port", "80", "--script-root", "/home/site/wwwroot/dist"]
