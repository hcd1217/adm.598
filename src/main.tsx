import React from "react";
import ReactDOM from "react-dom/client";

import "@/utils/dayjs";

import RootProvider from "./features/Providers";
import Router from "./routes";

import "@/assets/styles/global.css";

import "mantine-datatable/styles.layer.css";

import "@/assets/styles/layout.css";
import "@fontsource/ubuntu/latin.css";
import "@mantine/core/styles.layer.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";

const element = document.getElementById("root")!;

ReactDOM.createRoot(element).render(
  <React.StrictMode>
    <RootProvider>
      <Router />
    </RootProvider>
  </React.StrictMode>,
);
