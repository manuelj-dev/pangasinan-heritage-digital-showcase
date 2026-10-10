/** @type {import('next').NextConfig} */

// Set GITHUB_PAGES_REPO to your repo name when building for GitHub Pages,
// e.g. "/pangasinan-heritage-digital-showcase". Leave unset for local dev
// or if you deploy to username.github.io (root) / a custom domain.
const repoName = process.env.GITHUB_PAGES_REPO || '';

const nextConfig = {
  output: 'export',            // Static Site Generation (SSG) -> /out
  basePath: repoName,
  assetPrefix: repoName ? `${repoName}/` : undefined,
  trailingSlash: true,         // /page/index.html plays nicely with GitHub Pages
  env: {
    NEXT_PUBLIC_BASE_PATH: repoName,
  },
  images: {
    unoptimized: true,         // GH Pages has no image-optimization server
  },
};

export default nextConfig;
