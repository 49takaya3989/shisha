import { useState } from 'react'

import { ListObjectsCommand } from '@aws-sdk/client-s3'
import { Upload } from '@aws-sdk/lib-storage'
import { Image } from '@mantine/core'
import { FileWithPath } from '@mantine/dropzone'

import { bucketParams, BUCKET_NAME, s3Client } from 'utils/imageUpload'

export const useHandleImageOfAWSs3 = () => {
  const [files, setFiles] = useState<FileWithPath[]>([])
  const [imageS3, setImageS3] = useState<string[]>([''])

  // rich text editor内のimage preview作成
  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file)
    return (
      <Image
        key={index}
        src={imageUrl}
        alt=""
        imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
      />
    )
  })

  // S3へ画像のアップロード
  const imageUploadToAWS = async () => {
    try {
      const parallelUploads3 = new Upload({
        client: s3Client,
        params: {
          Bucket: BUCKET_NAME,
          Key: files[0].name,
          Body: files[0],
        },
        leavePartsOnError: false,
      })

      parallelUploads3.on('httpUploadProgress', (progress) => {
        console.log(progress)
      })

      await parallelUploads3.done()
      // await setIsLoading(false);
    } catch (e) {
      console.log(e)
    }
  }

  // S3から画像の取得
  const imageGet = () => {
    // Create the parameters for the bucket
    s3Client
      .send(new ListObjectsCommand(bucketParams))
      .then((res) => {
        res.Contents!.map((content) => {
          setImageS3((prevImageNames): string[] => {
            if (prevImageNames[0] === '') return [content.Key!]
            return [...prevImageNames, content.Key!]
          })
        })
      })
      .catch((err) => {
        console.log('Error', err)
      })
  }

  return { imageS3, previews, setFiles, imageUploadToAWS, imageGet }
}
