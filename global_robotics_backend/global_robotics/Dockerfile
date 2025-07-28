# Use a Java 17 base image
FROM eclipse-temurin:17-jdk AS builder

WORKDIR /app

# Copy Maven wrapper and project files
COPY . .

# Give permission to wrapper
RUN chmod +x mvnw

# Build the application
RUN ./mvnw clean package -DskipTests

# -------------------------
# Final Image
FROM eclipse-temurin:17-jdk

WORKDIR /app

# Copy built JAR file from builder stage
COPY --from=builder /app/target/global_robotics-0.0.1-SNAPSHOT.jar app.jar

# Expose port (make sure this matches your Spring Boot app's server.port)
EXPOSE 8080

# Run the JAR
ENTRYPOINT ["java", "-jar", "app.jar"]
