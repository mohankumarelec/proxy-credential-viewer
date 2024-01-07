import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "proxy-credential-viewer.showProxyCredential",
    () => {
      const config = vscode.workspace.getConfiguration("http");
      const proxy = config.proxyAuthorization as string;
      const bufferObj = Buffer.from(proxy.split(" ")[1], "base64");
      const decodedProxy = bufferObj.toString("utf8");
      const username = decodedProxy.split(":")[0];
      const password = decodedProxy.split(":")[1];
      vscode.window.showInformationMessage(`Proxy password: ${password}`);
      vscode.window.showInformationMessage(`Proxy username: ${username}`);
    }
  );
  context.subscriptions.push(disposable);
}

export function deactivate() {}
