# Build stage
FROM eclipse-temurin:17-jdk AS builder
WORKDIR /app
COPY . .
RUN chmod +x mvnw
RUN ./mvnw clean package -DskipTests

# Runtime stage
FROM eclipse-temurin:17-jdk
WORKDIR /app
COPY --from=builder /app/target/global_robotics-0.0.1-SNAPSHOT.jar app.jar

# Expose dynamic port (optional)
ARG PORT=8080
EXPOSE ${PORT}

# Start the Spring Boot app
ENTRYPOINT ["java", "-jar", "app.jar"]
