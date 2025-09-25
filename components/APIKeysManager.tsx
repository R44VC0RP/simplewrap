"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { APIKey } from "@/lib/types";

interface APIKeysManagerProps {
  initialApiKeys: APIKey[];
}

export function APIKeysManager({ initialApiKeys }: APIKeysManagerProps) {
  const [apiKeys, setApiKeys] = useState<APIKey[]>(initialApiKeys);
  const [newKeyName, setNewKeyName] = useState("");
  const [isCreatingKey, setIsCreatingKey] = useState(false);

  const createApiKey = async () => {
    if (!newKeyName.trim()) return;
    setIsCreatingKey(true);
    try {
      const { data } = await authClient.apiKey.create({
        name: newKeyName,
        expiresIn: 60 * 60 * 24 * 30, // 30 days
        prefix: "sk",
        permissions: {
          tweets: ["read", "write"],
          profile: ["read"],
        },
      });
      if (data) {
        setApiKeys([...apiKeys, data]);
        setNewKeyName("");
      }
    } catch (error) {
      console.error("Failed to create API key:", error);
    } finally {
      setIsCreatingKey(false);
    }
  };

  const deleteApiKey = async (keyId: string) => {
    try {
      await authClient.apiKey.delete({ keyId });
      setApiKeys(apiKeys.filter((key) => key.id !== keyId));
    } catch (error) {
      console.error("Failed to delete API key:", error);
    }
  };

  return (
    <div className="bg-muted/30 rounded-lg p-6 space-y-4">
      <h2 className="text-2xl font-heading font-semibold text-foreground">API Keys</h2>
      
      {/* Create New API Key */}
      <div className="flex gap-3">
        <input
          type="text"
          placeholder="API Key Name"
          value={newKeyName}
          onChange={(e) => setNewKeyName(e.target.value)}
          className="flex-1 px-3 py-2 border border-border rounded-lg bg-background text-foreground font-medium tracking-tight-4"
        />
        <Button
          onClick={createApiKey}
          disabled={isCreatingKey || !newKeyName.trim()}
          className="px-6 py-2 font-medium tracking-tight-4"
        >
          {isCreatingKey ? "Creating..." : "Create Key"}
        </Button>
      </div>

      {/* API Keys List */}
      <div className="space-y-3">
        {apiKeys.length === 0 ? (
          <p className="text-muted-foreground font-medium tracking-tight-4 text-center py-4">
            No API keys yet. Create one to get started!
          </p>
        ) : (
          apiKeys.map((key) => (
            <div key={key.id} className="bg-background rounded-lg p-4 border flex justify-between items-center">
              <div>
                <h3 className="font-heading font-semibold text-foreground">{key.name || "Unnamed Key"}</h3>
                <p className="text-sm text-muted-foreground font-medium tracking-tight-4">
                  {key.start || "sk"}••••••••
                </p>
                <p className="text-xs text-muted-foreground font-medium tracking-tight-4">
                  Created: {key.createdAt instanceof Date ? key.createdAt.toLocaleDateString() : new Date(key.createdAt).toLocaleDateString()}
                </p>
              </div>
              <Button
                onClick={() => deleteApiKey(key.id)}
                variant="destructive"
                size="sm"
                className="font-medium tracking-tight-4"
              >
                Delete
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
