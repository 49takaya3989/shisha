import { S3Client } from '@aws-sdk/client-s3'
import { Credentials } from 'aws-sdk'

export const REGION = process.env.NEXT_PUBLIC_S3_REGION!
export const BUCKET_NAME = process.env.NEXT_PUBLIC_S3_BUCKET_NAME!
export const S3_BASE_REQUEST_URL = process.env.NEXT_PUBLIC_S3_BASE_REQUEST_URL!

export const creds = new Credentials(
  process.env.NEXT_PUBLIC_S3_ACCESS_KEY!,
  process.env.NEXT_PUBLIC_S3_SECRET_KEY!
)

export const s3Client = new S3Client({ region: REGION, credentials: creds })

export const bucketParams = { Bucket: BUCKET_NAME }
