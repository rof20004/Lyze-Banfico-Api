#!/bin/sh

HOST_IP=$(ipconfig getifaddr en0);
HOST_IP=$HOST_IP docker-compose down;