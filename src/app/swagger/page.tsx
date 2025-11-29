"use client";

import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import { swaggerDocument } from "@/swagger";

export default function SwaggerPage() {
  return <SwaggerUI spec={swaggerDocument} />;
}
