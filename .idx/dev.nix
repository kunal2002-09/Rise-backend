# To learn more about how to use Nix to configure your environment
# see: https://developers.google.com/idx/guides/customize-idx-env
{ pkgs, ... }: {
  # Which nixpkgs channel to use.
  channel = "stable-23.11"; # or "unstable"
  # Use https://search.nixos.org/packages to find packages
  packages = [
    pkgs.nodejs_20
    pkgs.ngrok
  ];
  # Sets environment variables in the workspace
  env = {
    DB_DIALECT = "mysql";
    NODE_PORT = 8080;
    DB_PORT = "17385";
    DB_USER = "root";
    DB_HOST = "0.tcp.in.ngrok.io";
    DB_NAME = "new_schema";
    DB_PASSWORD = 12345678;
    NODE_ENV = "development";
    PORT = 3003;
    JWT_SECRET = "fd6c50e8eb6acdfa4876393284647550fe621da46d418b8f89c36446301099cf";
  };
  idx = {
    # Search for the extensions you want on https://open-vsx.org/ and use "publisher.id"
    extensions = [
      "rangav.vscode-thunder-client"
    ];
    workspace = {
      # Runs when a workspace is first created with this `dev.nix` file
      onCreate = {
        npm-install = "npm ci --no-audit --prefer-offline --no-progress --timing";
      };
      # Runs when a workspace is (re)started
      onStart = {
        run-server = "npm run dev";
      };
    };
  };
}
