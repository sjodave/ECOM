import { useState } from "react";

export default function useDisplayFeedback() {
  const [isOpen, setIsOpen] = useState(false);
  const [msg, setMsg] = useState("");
  return { isOpen, setIsOpen, msg, setMsg };
}
