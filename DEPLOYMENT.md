# GCP Cloud Run Deployment Guide

## Prerequisites

1. **Google Cloud SDK** installed and configured
2. **Docker** installed locally
3. **GCP Project** with billing enabled
4. **Cloud Run API** enabled

## Quick Deployment Steps

### 1. Enable Required APIs
```bash
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable containerregistry.googleapis.com
```

### 2. Set Project Variables
```bash
export PROJECT_ID="your-gcp-project-id"
export SERVICE_NAME="safeintel"
export REGION="us-central1"
```

### 3. Build and Deploy
```bash
# Build and push to Google Container Registry
gcloud builds submit --tag gcr.io/$PROJECT_ID/$SERVICE_NAME

# Deploy to Cloud Run
gcloud run deploy $SERVICE_NAME \
  --image gcr.io/$PROJECT_ID/$SERVICE_NAME \
  --platform managed \
  --region $REGION \
  --allow-unauthenticated \
  --memory 1Gi \
  --cpu 1 \
  --port 8080 \
  --max-instances 10
```

### 4. Alternative: One-Command Deploy
```bash
gcloud run deploy safeintel \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

## Configuration Options

### Memory and CPU
- **Memory**: 1Gi (recommended for ML models)
- **CPU**: 1-2 CPUs
- **Timeout**: 300 seconds (for ML inference)

### Environment Variables
```bash
gcloud run services update safeintel \
  --set-env-vars="FLASK_ENV=production" \
  --region us-central1
```

### Custom Domain
```bash
gcloud run domain-mappings create \
  --service safeintel \
  --domain your-domain.com \
  --region us-central1
```

## Monitoring and Logs

### View Logs
```bash
gcloud run services logs read safeintel --region us-central1
```

### Monitor Performance
- Go to Cloud Run console
- Select your service
- View metrics and logs

## Scaling Configuration

### Auto-scaling
```bash
gcloud run services update safeintel \
  --min-instances 0 \
  --max-instances 10 \
  --concurrency 80 \
  --region us-central1
```

## Security

### IAM Permissions
```bash
# Make service public (already done with --allow-unauthenticated)
gcloud run services add-iam-policy-binding safeintel \
  --member="allUsers" \
  --role="roles/run.invoker" \
  --region us-central1
```

## Troubleshooting

### Common Issues
1. **Build fails**: Check Dockerfile and dependencies
2. **Service won't start**: Check logs with `gcloud run services logs read`
3. **Out of memory**: Increase memory allocation
4. **Timeout**: Increase timeout or optimize model loading

### Debug Commands
```bash
# Get service details
gcloud run services describe safeintel --region us-central1

# List all services
gcloud run services list

# Delete service
gcloud run services delete safeintel --region us-central1
```

## Cost Optimization

1. **Set minimum instances to 0** for cost savings
2. **Use appropriate memory allocation** (1Gi for ML models)
3. **Monitor usage** in Cloud Console
4. **Set up billing alerts**

## After Deployment

Your SafeIntel application will be available at:
```
https://safeintel-[hash]-[region].run.app
```

The application serves:
- **Frontend**: React app at `/`
- **API**: Flask endpoints at `/predict`, `/health`, `/metrics`
