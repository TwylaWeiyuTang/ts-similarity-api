"use client";

import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert, { AlertProps } from "@mui/material/Alert";
import { AlertTitle } from "@mui/material";
import Link from "next/link";
import { useTheme } from "next-themes";
import { InfoIcon } from "lucide-react";

const AlertComponent = React.forwardRef<HTMLDivElement, AlertProps>(
  function AlertFunc(props, ref) {
    return (
      <Alert elevation={6} ref={ref} {...props}>
        <AlertTitle>
          Disclaimer: This is an experimental product powered by{" "}
          <Link
            href={
              "https://platform.openai.com/docs/guides/embeddings/what-are-embeddings"
            }
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-2"
          >
            Open AI text-embedding-02 model
          </Link>
        </AlertTitle>
        The model being used for generating the similarity score has some
        drawbacks. The result might not be accurate.
        <br />
        For more information please go through this&nbsp;
        <Link
          href={
            "https://community.openai.com/t/question-on-text-embedding-ada-002/175904"
          }
          target="_blank"
          rel="noreferrer"
          className="underline underline-offset-2"
        >
          post
        </Link>
        .
      </Alert>
    );
  }
);

export default function CustomizedSnackbars() {
  const [open, setOpen] = React.useState(true);
  const { theme } = useTheme();

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      {open && (
        <Stack spacing={2} sx={{ width: "100%" }}>
          <AlertComponent
            onClose={handleClose}
            sx={{ width: "100%" }}
            className="dark:text-slate-200 dark:border-blue-300 lg:text-base dark:bg-gray-500/50"
            icon={<InfoIcon className="dark:text-blue-300 text-blue-500" />}
          />
        </Stack>
      )}
    </>
  );
}
