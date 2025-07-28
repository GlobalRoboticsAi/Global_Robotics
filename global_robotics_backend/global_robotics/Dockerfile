# ---- Build Stage ----
FROM eclipse-temurin:17-jdk AS builder

WORKDIR /app
COPY . .

RUN chmod +x mvnw
RUN ./mvnw clean package -DskipTests

# ---- Runtime Stage ----
FROM eclipse-temurin:17-jdk

WORKDIR /app

# Copy the JAR file from build stage
COPY --from=builder /app/target/global_robotics-0.0.1-SNAPSHOT.jar app.jar

# Expose the port (Railway uses 8080 or custom, so make it flexible)
ARG PORT=8080
ENV PORT=${PORT}
EXPOSE ${PORT}

ENTRYPOINT ["java", "-jar", "app.jar"]
