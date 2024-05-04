s#include <WiFi.h> 
#include <WebServer.h>
#include <ArduinoJson.h>
const char* ssid = "Your wifi ssid";
const char* password = "your password";
String M,aux ;
WebServer server(80);
void handleData() {
  if (server.hasArg("plain")) {
    String jsonMessage = server.arg("plain"); 
    //Serial.print("Received JSON message: ");
    //Serial.println(jsonMessage);
    StaticJsonDocument<200> doc; 
    DeserializationError error = deserializeJson(doc, jsonMessage);
    if (error) {
      server.send(400, "application/json", "Error parsing JSON");
    } 
    else {
      const char* messageValue = doc["message"];
      M=String(messageValue);
      server.send(200, "application/json",messageValue );
    }
  } 
  else {
    server.send(400, "text/plain", "Missing JSON message");
  }
}
void setup() {
  Serial.begin(9600);
  for(int i = 0; i < 34; i++) {
    if(!( (6 <= i && i <= 11) || i == 0 || i == 1 || i == 3)) {
        pinMode(i, OUTPUT);
    }
}
  WiFi.begin(ssid, password);
  Serial.println("Connecting...");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    //Serial.println(WiFi.status());
    Serial.println("Connecting...");
  }
  Serial.println(WiFi.localIP());
  server.on("/read_request", HTTP_POST, handleData); 
  server.begin();
}

void loop() {
  server.handleClient();
  if (M!=aux) {
    String a = M;
    if ( a[0]=='L'){
      int N = a.substring(1,3).toInt();
      String ch= a.substring(3,a.length());
      if(ch=="off"){
       // Serial.println(N);
        digitalWrite(N, LOW);
        delay(1000);
      }
      else if (ch=="on"){
        //Serial.println(N);
        digitalWrite(N,HIGH);
        delay(1000);
      }
    }
    else if ( a[0]=='W'){
      int N1 = a.substring(1,3).toInt();// Up
      int N2 = a.substring(3,5).toInt();// Down
      String ch= a.substring(5,a.length());
      if(ch=="UP"){
        digitalWrite(N1, 0);
        digitalWrite(N2, 1);
      }
      else if (ch=="DOWN"){
        digitalWrite(N1, 1);
        digitalWrite(N2, 0);
      }
      else if (ch=="STOP"){
        digitalWrite(N1, 0);
        digitalWrite(N2, 0);
      } 
    }
    aux=M;
  }
}