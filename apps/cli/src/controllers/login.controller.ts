import SupabaseService from "../services/supabase.service";

export enum PromptLoginType {
  Google = "Google",
  Email = "Email",
}

class LoginController {
  public async promptLoginAsync(): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      const inquirer = await import("inquirer");
      inquirer.default
        .prompt([
          {
            type: "list",
            name: "login_type",
            message: "How would you like to login?",
            choices: [
              PromptLoginType.Google,
              PromptLoginType.Email,
            ],
          },
        ])
        .then(async (results: Record<string, string>) => {
          const loginType = results?.["login_type"] as string;
          if (loginType === PromptLoginType.Google) {
            await this.promptGoogleLoginAsync();
          } else if (loginType === PromptLoginType.Email) {
            await this.promptEmailLoginAsync();
          }
          resolve();
        });
    });
  }

  private async promptGoogleLoginAsync(): Promise<void> {
    if (!SupabaseService.supabaseClient) {
      return;
    }

    try {
      const { data, error } = await SupabaseService.supabaseClient.auth
        .signInWithOAuth({
          provider: "google",
          options: {
            queryParams: {
              prompt: "consent",
            },
            redirectTo: "http://localhost:4200",
          },
        });
      if (error) {
        throw error;
      }

      const url = data?.["url"] as string;
      if (!url) {
        console.error("No url!");
        return;
      }
    } catch (error: any) {
      console.error(error);
      await this.promptLoginAsync();
    }
  }

  private async promptEmailLoginAsync(): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      const inquirer = await import("inquirer");
      inquirer.default
        .prompt([
          {
            type: "input",
            name: "email",
            message: "Whats your email?",
          },
          {
            type: "password",
            name: "password",
            message: "Whats your password?",
          },
        ])
        .then(async (results) => {
          if (!SupabaseService.supabaseClient) {
            return;
          }

          const email = results.email;
          const password = results.password;
          try {
            const { data, error } = await SupabaseService.supabaseClient.auth
              .signInWithPassword({
                email: email,
                password: password,
              });
            if (error) {
              throw error;
            }

            if (data.session) {
              const accessToken = data.session.access_token;
              const refreshToken = data.session.refresh_token;
              await SupabaseService.setSessionAsync(accessToken, refreshToken);
            }
          } catch (error: any) {
            console.error(error);
            await this.promptLoginAsync();
          }

          resolve();
        });
    });
  }
}

export default new LoginController();
