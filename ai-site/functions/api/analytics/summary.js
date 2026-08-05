import handler from "./[[default]].js";

export default async function onRequest(context){return handler(context);}
export async function onRequestGet(context){return handler(context);}
export async function onRequestOptions(context){return handler(context);}
