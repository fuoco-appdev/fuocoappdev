import { Core } from "https://fuoco-appdev-core-api-pkmaxa4qwqt0.deno.dev/core/src/index.ts";
import { AppController, UserController} from "../controllers/index.ts";

const app = Core.registerApp([
    new UserController(), 
    new AppController()
]);
app.listen({port: 8000});

// To invoke:
// curl -i --location --request POST 'http://localhost:54321/functions/v1/' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24ifQ.625_WdcF3KHqz5amU0x2X5WWHP-OEs_4qj0ssLNHzTs' \
//   --header 'Content-Type: application/json' \
//   --data '{"name":"Functions"}'
