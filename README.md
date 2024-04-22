# DayZ Community Template

This is an easy to customize, forever-free template to bring an online presence to your (DayZ) gaming community. While initially intended to be used for DayZ communities, all DayZ specific elements can be easily disabled - making this template ideal for any gaming community.

> 😎 Have any questions or just want to chill/have a chat? Come join our [support server](https://discord.gg/mirasaki).

## ✨ Demo

A demo deployment showcasing this project can be found [here](https://template-1.mirasaki.dev/).

![Preview image](/public/images/marketing/banner.png "Preview")

## 🚀 Deploy on Vercel

The easiest way to deploy this Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FMirasaki-Development%2Fdayz-community-template&env=STEAM_API_KEY,CFTOOLS_API_APPLICATION_ID,CFTOOLS_API_SECRET&envDescription=Credentials%20required%20for%20the%20application.&envLink=https%3A%2F%2Fgithub.com%2FMirasaki-Development%2Fdayz-community-template%3Ftab%3Dreadme-ov-file%23environmental-values&project-name=my-dayz-website&repository-name=my-dayz-website&demo-title=%5BDemo%5D%20DayZ%20Community%20Website&demo-description=An%20easy%20to%20customize%2C%20forever-free%20template%20to%20bring%20an%20online%20presence%20to%20your%20(DayZ)%20gaming%20community.&demo-url=https%3A%2F%2Ftemplate-1.mirasaki.dev%2F&demo-image=https%3A%2F%2Fraw.githubusercontent.com%2FMirasaki-Development%2Fdayz-community-template%2Fmain%2Fpublic%2Fimages%2Fmarketing%2Fbanner.png)

## 📦 Installation (Docker, recommended)

We recommend [Docker (Desktop)](https://www.docker.com/products/docker-desktop/) for any modern application, as it accelerates the build & run process and standardizes environments.

1. Download and extract [the latest release](https://github.com/Mirasaki-Development/dayz-community-template/releases) and navigate into the newly created folder.
2. Rename `/.env.example` to `/.env.local` (make sure [file extensions are enabled](https://www.youtube.com/watch?v=z5FBLAagPIc) if you're on Windows) and fill in your configuration.
3. Open `/config.ts` and customize to your hearts content.
4. Run the following commands in this exact order:

```sh
# Build the project
docker compose build

# Start the project
docker compose up -d
```

The project is now available on [port 13001](http://localhost:13001/). This is (by default) only available locally through a Docker network bridge, and you should be able to add a web-server to the `docker-compose.yml` file [fairly easily](https://hub.docker.com/_/nginx/) if desired.

## 🔨 Installation (Local, alternative)

1. Install [Node.js](https://nodejs.org/en/download).
2. Install [PNpm](https://pnpm.io/installation) on your machine.
    - Windows: `iwr https://get.pnpm.io/install.ps1 -useb | iex`
    - POSIX systems: `curl -fsSL https://get.pnpm.io/install.sh | sh -`
    - POSIX w/o CURL: `wget -qO- https://get.pnpm.io/install.sh | sh -`
3. Download and extract [the latest release](https://github.com/Mirasaki-Development/dayz-community-template/releases) and navigate into the newly created folder. (Don't install the project in the `Desktop` directory if you're on Windows due to permissions)
4. Rename `/.env.example` to `/.env.local` (make sure [file extensions are enabled](https://www.youtube.com/watch?v=z5FBLAagPIc) if you're on Windows) and fill in your configuration.
5. Open `/config.ts` and customize to your hearts content.
6. Run the following commands in this exact order:

```sh
# Install dependencies
pnpm install

# Build the project
pnpm build

# Start the project
pnpm start
```

The project is now available on [port 3000](http://localhost:3000/). This is only available on your local network.

## ⚙️ Configuration

The bulk of the configuration is done in the `/config.ts` file. This is a Typescript file, meaning the syntax for this configuration object is very similar to JSON. All keys are meant to be self-explanatory, if you need additional information - head on over to the `/src/lib/config.types.ts` file for explanations.

### Environmental Values

This section documents the values defined in the `/.env.local` file.

> When configuring the CFTools Developer Application, you are required to [grant access to resources](https://wiki.mirasaki.dev/docs/cftools-create-application#grant-access-to-resources).

```bash
# Your Steam API key can be obtained here: https://steamcommunity.com/dev/apikey
# The domain on the page linked above doesn't have to match
# This is used to fetch your dayz server information
STEAM_API_KEY=

# CFTools Developer Application
# Values can be grabbed from https://developer.cftools.cloud/applications
# Please refer to the documentation if you're unsure: https://wiki.mirasaki.dev/docs/cftools-create-application
# This is used to fetch the leaderboard information
CFTOOLS_API_APPLICATION_ID=
CFTOOLS_API_SECRET=
```

### Static Files

Static files/assets are served from the `/public` directory. Whenever an image (or other type of local file) is used in the configuration, it's value (the path) is relative to this root `public` directory. That means `/images/logo.png` in the configuration file points to `/public/images/logo.png`.

### CSS and styling

Although simple styling configuration is done in the `/config.ts` file, theme customization can be performed in `/src/app/globals.css`. These are space-separated HSL values.

You can use [this website](https://atmos.style/color-picker/hsl) to obtain your HSL values. Do note, `hsl(184.4, 95%, 60.8%)` format is incorrect, use `184.4 95% 60.8%` instead.

### Favicon (and other metadata files)

The favicon (browser tab/bookmark icon for pages) can be customized by replacing the source files in `/src/app/favicon.ico`. You can generate these source files from your logo/icon [on this site](https://favicon.io/favicon-converter/). Simply upload your logo/icon and click "Download". **Remember** to update the `apple-touch-icon` and `favicon-16x16` images in `/public` as well!

For more information on metadata files in Next.JS, check out the [developer reference](https://nextjs.org/docs/app/api-reference/file-conventions/metadata).

### Web Server

After you've set-up and configured the website, it will only be available on your local network. To allow anyone to reach your website, basic knowledge of web-servers (like [Apache](https://apache.org/) or [Nginx](https://nginx.org/en/)) is required.

- An example Nginx file is included for your convenience [here](/examples/nginx.example.conf).
- This configuration serves all static assets, if these fail to load (like no styles applied to the website) use the [minimal conf instead](/examples/nginx.min.conf).

Web host providers (like [Vykix](https://portal.vykix.com/aff.php?aff=17)) usually provide this functionality for you. When looking for a host, make sure they support `Node.js` and/or `Next.js` and you'll be able to get started - there's no additional dependencies.

### CFTools Leaderboard

The [CFTools](https://cftools.com/) leaderboard can be disabled at any time. You can find your required `/.env.local` values by following [our guide](https://wiki.mirasaki.dev/docs/cftools-create-application). Please note the leaderboard endpoint requires an active CFTools subscription.

## 🛠️ Development

The following stack and tools are used for this template:

- [PNpm](https://pnpm.io/) - For package management and faster installation of dependencies.
- [Turborepo](https://turbo.build/repo) - For significantly faster build times.
- [NextJS](https://nextjs.org/) - For building fast, scalable React applications with built-in SSR, SSG, and routing capabilities.
- [Flowbite](https://flowbite.com) - For production-ready Tailwind `blocks` and `components` (developer license).
- [shadcn/ui](https://ui.shadcn.com/) - For quickly building your own component library.
- [TailwindCSS](https://tailwindcss.com/) - For rapidly building custom user interfaces using utility-first CSS classes.
- [Framer Motion](https://www.framer.com/motion/) - For creating fluid animations and interactive UI elements in React applications.
- [Lucide React](https://lucide.dev/guide/packages/lucide-react) - For adding SVG icons and illustrations to React projects with ease.

## ❗ Common Issues

### ERR_ABORTED

If you're getting `net::ERR_ABORTED 404` errors, that means you have created a new production build but the process listening on your port is still trying to serve previous build files - fix this by restarting your process.

## 👤 Author

### Richard Hillebrand (Mirasaki)

- Website: [https://mirasaki.dev/](https://mirasaki.dev/)
- Github: [@Mirasaki](https://github.com/Mirasaki)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!

Feel free to check out the [issues page](https://github.com/Mirasaki-Development/dayz-community-template/issues).

## 🤩 Show your support

Give a ⭐️ if this project helped you!

## 📝 Licensing

This project is MIT licensed, meaning you're in full control.

### Flowbite

[Flowbite](https://flowbite.com) was used for some of the components in this template. Please note, if you want to add any other flowbite components, you **will need** your own license.
