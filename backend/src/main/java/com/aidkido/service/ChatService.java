package com.aidkido.service;

import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

@Service
public class ChatService {

    public String askAI(String userMessage) {

        try {

            String body = """
            {
              "system": "You are a kid-friendly fun AI for children age 5-10. Respond sweetly.",
              "messages":[{"role":"user","content":"%s"}]
            }
            """.formatted(userMessage);

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create("https://verdictapi.com/api/v1/conversation"))
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(body))
                    .build();

            HttpClient client = HttpClient.newHttpClient();
            HttpResponse<String> response =
                    client.send(request, HttpResponse.BodyHandlers.ofString());

            return response.body();

        } catch (Exception e) {
            return "Oops, I'm sleepy 😴 Try later!";
        }
    }
}

