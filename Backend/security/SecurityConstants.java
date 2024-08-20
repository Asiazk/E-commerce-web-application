package com.asia.ecommerce.security;

public class SecurityConstants {
    final static int MINUTES = 60; // authentication token is available for 1 hour
    final static int SECONDS = 60;
    final static int MILLISECONDS = 1000;

    public static final long JWT_EXPIRATION = MILLISECONDS*SECONDS*MINUTES;
    public static final String JWT_SECRET_KEY = "c7d75f347aca97105ca379469b9aa8de92c88444dc58abf3ff1a8ad6a77add50";
}
