import { Users } from "./users";
import { Movies } from "./movies";
import { applyMixins } from "./utils";
import { Base } from "./base";
import { Auth } from "./auth";

class ApiClient extends Base {}
interface ApiClient extends Users, Movies, Auth {}
applyMixins(ApiClient, [Users, Movies, Auth]);

export default ApiClient;
