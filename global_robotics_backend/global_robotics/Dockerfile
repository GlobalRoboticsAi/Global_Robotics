# Use a Java 17 base image
FROM eclipse-temurin:17-jdk AS builder

# Set working directory
WORKDIR /app

# Copy the project files
COPY . .

# Make the Maven wrapper executable
RUN chmod +x mvnw

# Build the application (skip tests)
RUN ./mvnw clean package -DskipTests

# --------------------------------------------
# Final runtime image
FROM eclipse-temurin:17-jdk

# Set working directory
WORKDIR /app

# Copy the built jar from builder
COPY --from=builder /app/target/global_robotics-0.0.1-SNAPSHOT.jar app.jar

# Expose Spring Boot default port
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
