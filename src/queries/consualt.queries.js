import { checkIsAccountSuspended } from "@/services/consult.service";
import {  queryOptions } from "@tanstack/react-query";


export default function getIsAccountSuspendedQuery() {
    return queryOptions({
        queryKey: ["is-account-suspended"],
        queryFn: async () => {
            try {
                const res = await checkIsAccountSuspended();
                return res?.data || null;
            } catch (err) {
                return null;
            }
        },
        staleTime: Infinity,
        retry: false,
    });
}