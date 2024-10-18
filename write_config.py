import json

# Initialize an empty config dictionary
config_data = {
    "development": {
        "ganache_host": input("Enter Ganache Host (default: 127.0.0.1): ") or "127.0.0.1",
        "port": int(input("Enter Port (default: 7545): ") or 7545),
        "network_id": input("Enter Network ID (default: 5777): ") or "5777"
    },
    "sepolia": {
        "provider": input("Enter Provider URL: (default: https://sepolia.infura.io/v3/ad90e0f9dbec4a92a6ba74831d62525e)") or "https://sepolia.infura.io/v3/ad90e0f9dbec4a92a6ba74831d62525e",
        "timeout": int(input("Enter Timeout (default: 40000): ") or 40000),
        "network_id": int(input("Enter Network ID (default: 11155111): ") or 11155111),
        "gas": int(input("Enter Gas (default: 5000000): ") or 5000000),
        "gasPrice": int(input("Enter Gas Price (default: 1000000000): ") or 1000000000),
        "confirmations": int(input("Enter Confirmations (default: 2): ") or 2),
        "timeoutBlocks": int(input("Enter Timeout Blocks (default: 200): ") or 200),
        "skipDryRun": input("Skip Dry Run (true/false, default: true): ").lower() == 'true',
        "fromAccount": input("Enter From Account: (default: 0x647A17644F560e71e9A1BbC317ba3ba736C3369F)") or "0x647A17644F560e71e9A1BbC317ba3ba736C3369F"
    },
    "solidity": {
        "version": input("Enter Solidity Version (default: 0.8.27): ") or "0.8.27",
        "location": input("Enter Location (default: london): ") or "london"
    }
}

# Write to config.json
with open('config.json', 'w') as config_file:
    config_file.write(f'{json.dumps(config_data, indent=2)}')

print("Config file saved as config.json")