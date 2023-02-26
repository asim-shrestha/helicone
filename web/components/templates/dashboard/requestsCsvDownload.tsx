import { CSVDownload, CSVLink } from "react-csv";
import { SupabaseClient } from "@supabase/supabase-js";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { GetTableData } from "./requestTable";
import { escapeCSVString } from "../../shared/themed/themedFilter";

export function RequestsCSVDownloadButton({
  client,
}: {
  client: SupabaseClient;
}) {
  const tableData = GetTableData({ client });

  const latency = tableData.data.map((d) => {
    const request = new Date(d.request_created_at!);
    const response = new Date(d.response_created_at!);
    return (response.getTime() - request.getTime()) / 1000;
  });

  const data = tableData.data.map((d, i) => {
    return {
      request_id: d.request_id,
      response_id: d.response_id,
      time: d.request_created_at,
      request: "hello,", //escapeCSVString(d.request_body?.prompt),
      response: "hello:", //escapeCSVString(d.response_body?.choices?.[0]?.text),
      "duration (s)": latency[i],
      total_tokens: d.response_body?.usage?.total_tokens,
      logprobs: tableData.probabilities[i],
      request_user_id: d.request_user_id,
      model: d.response_body?.model,
      temperature: d.request_body?.temperature,
    };
  });

  return (
    <CSVLink
      data={data}
      filename={"requests.csv"}
      className="flex"
      target="_blank"
    >
      <span>
        <ArrowDownTrayIcon className="mr-1 flex-shrink-0 h-4 w-4" />
      </span>
      <span>Export to CSV</span>
    </CSVLink>
  );
}
