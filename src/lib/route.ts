import { useEffect, useState } from "react";

/**
 * 最小 hash 路由。
 *
 *   #/chain              产业链选择（第 0 层，三条链三张卡）
 *   #/chain/<chainId>    某条链的环节与企业
 *   #/m/<matId>/<rowId>  详情页
 *   #/prompts[/<subId>]  提示词编辑（问题 + 读法，按生效日分版本）
 *   （无 hash）            七类阅读器（第 1 层起）
 *
 * 不引 react-router：只有三个二级页面，一个正则就够。
 * hash 与现有的 ?cat=&sub=&grain= 查询参数互不干扰（一个读 search，一个读 hash）。
 */
export type Route =
  | { name: "dash" }
  | { name: "picker" }
  | { name: "chain"; chainId: string }
  | { name: "detail"; matId: string; rowId: string }
  | { name: "prompts"; subId?: string };

const DETAIL_RE = /^#\/m\/([^/]+)\/([^/]+)$/;
const CHAIN_RE = /^#\/chain\/([^/]+)$/;
const PROMPTS_RE = /^#\/prompts(?:\/([^/]+))?$/;

export function parseHash(h: string = location.hash): Route {
  if (h === "#/chain" || h === "#/chain/") return { name: "picker" };
  const c = CHAIN_RE.exec(h);
  if (c) return { name: "chain", chainId: decodeURIComponent(c[1]) };
  const pr = PROMPTS_RE.exec(h);
  if (pr) return { name: "prompts", subId: pr[1] ? decodeURIComponent(pr[1]) : undefined };
  const m = DETAIL_RE.exec(h);
  if (m) return { name: "detail", matId: decodeURIComponent(m[1]), rowId: decodeURIComponent(m[2]) };
  return { name: "dash" };
}

export const hrefOf = (matId: string, rowId: string): string =>
  `#/m/${encodeURIComponent(matId)}/${encodeURIComponent(rowId)}`;

export const chainHrefOf = (chainId: string): string => `#/chain/${encodeURIComponent(chainId)}`;

export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(() => parseHash());
  useEffect(() => {
    const onChange = () => setRoute(parseHash());
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);
  return route;
}

export function openDetail(matId: string, rowId: string) {
  location.hash = hrefOf(matId, rowId);
}

export function closeDetail() {
  if (history.length > 1) history.back();
  else location.hash = "";
}

/** 切到同一材料的另一行（只改 hash，不压历史栈） */
export function replaceRow(rowId: string) {
  const r = parseHash();
  if (r.name !== "detail") return;
  location.replace(hrefOf(r.matId, rowId));
}
