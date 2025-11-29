export const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "My App API Docs",
    version: "1.0.0",
    description: "Next.js API documentation with Swagger",
  },
  paths: {
    "/api/users": {
      get: {
        summary: "Get all demo users",
        responses: {
          200: {
            description: "List of users",
          },
        },
      },
    },
    "/api/products": {
      get: {
        summary: "Get all demo products",
        responses: {
          200: { description: "List of products" },
        },
      },
    },
    "/api/location": {
      post: {
        summary: "Save GPS location",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  lat: { type: "number" },
                  lng: { type: "number" },
                },
              },
            },
          },
        },
        responses: {
          200: { description: "Location stored" },
        },
      },
    },
  },
};
