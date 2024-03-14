const withMDX = require('@next/mdx')()
 
/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  images:{
        unoptimized:true
      },
      output: 'export',
      trailingSlash: true, // for s3 routing
}
 
module.exports = withMDX(nextConfig)


// const nextConfig = {
//   images:{
//     unoptimized:true
//   },
//   pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
// }

