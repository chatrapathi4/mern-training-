import React, { useEffect, useState } from 'react'
import { Button, Stack, TextInput, Anchor } from '@mantine/core';
import Service from '../../utils/http';


const URLShortener = () => {
   const service = new Service();
   const [data, setData] = useState({});
   const [shortUrl, setShortUrl] = useState("");
   const handleSubmit = async () => {
    try {
              const response = await service.post('shorturl', data);
              const shortCode = response?.data?.shortCode ?? response?.shortCode ?? "";
              const nextShortUrl = shortCode ? `${window.location.origin}/${shortCode}` : "";
              setShortUrl(nextShortUrl);
       } catch (error) {
           console.error("POST API call failed!", error.message);
       }
   }
   useEffect(() => {
       console.log(`Short URL is ${shortUrl}`);
   }, [shortUrl])

   return (
       <>
           {shortUrl ? (
            <stack>
                your Short URL: <Anchor href={shortUrl} target="_blank" underline="hover">
                    {shortUrl}
                    </Anchor>
            </stack>) :
               (<Stack>
                   <TextInput
                       size="md"
                       label="Original URL"
                       withAsterisk
                       onChange={ (e) => setData({ ...data, originalUrl: e.target.value }) }
                       placeholder="Enter original URL"
                   />
                   <TextInput
                       size="md"
                       label="Short Code"
                       onChange={ (e) => setData({ ...data, customUrl: e.target.value }) }
                       placeholder="Enter short URL"
                   />
                   <TextInput
                       size="md"
                       label="title"
                       onChange={ (e) => setData({ ...data, title: e.target.value }) }
                       placeholder="Enter title"
                   />
                   <Button onClick={handleSubmit}>Shorten URL</Button>
               </Stack>)
           }
       </>
   )
}

export default URLShortener;