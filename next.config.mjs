/** @type {import('next').NextConfig} */
const repoName = process.env.GITHUB_PAGES_REPO_NAME || "";

const nextConfig = {
  reactStrictMode: true,
  output: "export",
  basePath: repoName ? `/${repoName}` : "",
  assetPrefix: repoName ? `/${repoName}/` : "",
};

export default nextConfig;
