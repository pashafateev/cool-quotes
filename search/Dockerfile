FROM getmeili/meilisearch:v1.7

# Let Render know you're exposing a port (doesn't affect runtime behavior)
EXPOSE 7700

# Bind Meilisearch to the port Render expects (default is $PORT, e.g., 10000)
CMD ["meilisearch", "--http-addr", "0.0.0.0:${PORT}"]