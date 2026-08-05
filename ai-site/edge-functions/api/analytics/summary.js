import handler from "./[[default]].js";

export default async function onRequest(context){
  return handler(context);
}
