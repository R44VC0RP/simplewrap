"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useState, useEffect, useCallback } from "react";
import { APIKey } from "@/lib/types";
import { Input } from "./ui/input";
import { ClickToCopy } from "./ClickToCopy";

interface APIKeysManagerProps {
  initialApiKeys: APIKey[];
}

export function APIKeysManager({ initialApiKeys }: APIKeysManagerProps) {
  const [apiKeys, setApiKeys] = useState<APIKey[]>(initialApiKeys);
  const [newKeyName, setNewKeyName] = useState("");
  const [isCreatingKey, setIsCreatingKey] = useState(false);
  const [newlyCreatedKeyId, setNewlyCreatedKeyId] = useState<string | null>(null);
  const [keyPendingDeletion, setKeyPendingDeletion] = useState<string | null>(null);

  const createApiKey = async () => {
    if (!newKeyName.trim()) return;
    setIsCreatingKey(true);
    try {
      const { data } = await authClient.apiKey.create({
        name: newKeyName,
        expiresIn: 60 * 60 * 24 * 30, // 30 days in seconds
        prefix: "swsk_",
      });
      if (data) {
        setApiKeys([...apiKeys, data]);
        setNewKeyName("");
        setNewlyCreatedKeyId(data.id);
      }
    } catch (error) {
      console.error("Failed to create API key:", error);
    } finally {
      setIsCreatingKey(false);
    }
  };

  const handleDeleteClick = (keyId: string) => {
    if (keyPendingDeletion === keyId) {
      // Second click - actually delete
      deleteApiKey(keyId);
    } else {
      // First click - show confirmation
      setKeyPendingDeletion(keyId);
      // Auto-revert after 2 seconds
      setTimeout(() => {
        setKeyPendingDeletion(null);
      }, 2000);
    }
  };

  const deleteApiKey = async (keyId: string) => {
    try {
      await authClient.apiKey.delete({ keyId });
      setApiKeys(apiKeys.filter((key) => key.id !== keyId));
      setKeyPendingDeletion(null);
    } catch (error) {
      console.error("Failed to delete API key:", error);
      setKeyPendingDeletion(null);
    }
  };

  const hideFullKey = (keyId: string) => {
    setNewlyCreatedKeyId(null);
    // Remove the full key from the API key object
    setApiKeys(keys => 
      keys.map(key => 
        key.id === keyId ? { ...key, key: undefined } : key
      )
    );
  };

  // Auto-hide the key after 30 seconds
  useEffect(() => {
    if (newlyCreatedKeyId) {
      const timer = setTimeout(() => {
        hideFullKey(newlyCreatedKeyId);
      }, 30000); // 30 seconds

      return () => clearTimeout(timer);
    }
  }, [newlyCreatedKeyId]);

  // Handle keyboard shortcut for creating API key (Cmd/Ctrl + Enter)
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
      event.preventDefault();
      if (newKeyName.trim() && !isCreatingKey) {
        createApiKey();
      }
    }
  }, [newKeyName, isCreatingKey, createApiKey]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-heading font-semibold text-foreground">API Keys</h2>
      
      {/* Create New API Key */}
      <div className="flex gap-3">
        <Input
          type="text"
          placeholder="API Key Name (⌘+Enter to create)"
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
          apiKeys.map((key) => {
            const isNewlyCreated = newlyCreatedKeyId === key.id && key.key;
            const isPendingDeletion = keyPendingDeletion === key.id;
            
            return (
              <div key={key.id} className="bg-background rounded-lg p-4 border flex justify-between items-center">
                <div className="flex-1">
                  <h3 className="font-heading font-semibold text-foreground">{key.name || "Unnamed Key"}</h3>
                  
                  {isNewlyCreated ? (
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-foreground">Your API Key:</span>
                        <span className="text-xs text-muted-foreground">(copy this now - it won't be shown again)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ClickToCopy 
                          text={key.key!} 
                          variant="default" 
                          onCopy={() => {
                            // Hide the key after a short delay when copied
                            setTimeout(() => hideFullKey(key.id), 2000);
                          }}
                        />
                        <Button
                          onClick={() => hideFullKey(key.id)}
                          variant="outline"
                          size="sm"
                          className="text-xs font-medium tracking-tight-4"
                        >
                          Hide
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground font-medium tracking-tight-4">
                      {key.start || "sk"}••••••••
                    </p>
                  )}
                  
                  <p className="text-xs text-muted-foreground font-medium tracking-tight-4 mt-1">
                    Created: {key.createdAt instanceof Date ? key.createdAt.toLocaleDateString() : new Date(key.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <Button
                  onClick={() => handleDeleteClick(key.id)}
                  variant="destructive"
                  size="sm"
                  className={`font-medium tracking-tight-4 transition-all duration-200 ${
                    isPendingDeletion ? 'animate-pulse bg-red-600 hover:bg-red-700' : ''
                  }`}
                >
                  <span className="transition-all duration-200">
                    {isPendingDeletion ? 'Really?' : 'Delete'}
                  </span>
                </Button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
