export const DEMO_ACCESS_PASSWORDS:Record<string,string> = {
  "commodity-ai-ops":"3187",
  "cloud-warehouse-map":"5432",
  "opportunity-publishing-workflow":"1964",
  "commodity-ai-app":"6579",
  "price-alert":"2846",
  "priority-matrix":"7318",
  "ai-confidence":"4095",
  "bulk-trading-platform":"8627",
};

export const getDemoAccessPassword=(slug:string)=>DEMO_ACCESS_PASSWORDS[slug]??"6579";
export const getDemoAccessSessionKey=(slug:string)=>`product-demo-unlocked-${slug}-${getDemoAccessPassword(slug)}`;
