"use client";

import { mockIncidents } from "@/data/mockData";
import type { Incident, ReviewStatus } from "@/types";

const INCIDENTS_KEY = "civicguard:incidents:v1";
const LAST_INCIDENT_ID_KEY = "civicguard:lastIncidentId";
const UPDATED_AT_KEY = "civicguard:lastUpdatedAt";
const STORAGE_EVENT = "civicguard:storage";

export type IncidentStoreSnapshot = {
  incidents: Incident[];
  lastIncidentId: string | null;
  lastUpdatedAt: string | null;
};

function canUseStorage() {
  return typeof window !== "undefined" && Boolean(window.localStorage);
}

function nowIso() {
  return new Date().toISOString();
}

function emitStorageChange() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(STORAGE_EVENT));
  }
}

function sortIncidents(incidents: Incident[]) {
  return [...incidents].sort(
    (a, b) =>
      new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime(),
  );
}

function normalizeIncident(incident: Incident): Incident {
  const legacyIncident = incident as Incident & { reviewerNotesPreview?: string };

  return {
    ...incident,
    reviewerNotes:
      incident.reviewerNotes ??
      legacyIncident.reviewerNotesPreview ??
      "No reviewer notes yet.",
  };
}

export function readStoredIncidents(): Incident[] {
  if (!canUseStorage()) {
    return [];
  }

  const raw = window.localStorage.getItem(INCIDENTS_KEY);

  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.map((incident) => normalizeIncident(incident as Incident));
  } catch {
    return [];
  }
}

export function writeStoredIncidents(incidents: Incident[]) {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.setItem(
    INCIDENTS_KEY,
    JSON.stringify(sortIncidents(incidents.map(normalizeIncident))),
  );
  window.localStorage.setItem(UPDATED_AT_KEY, nowIso());
  emitStorageChange();
}

export function getAllIncidents() {
  const merged = new Map<string, Incident>();

  for (const incident of mockIncidents) {
    merged.set(incident.id, normalizeIncident(incident));
  }

  for (const incident of readStoredIncidents()) {
    merged.set(incident.id, normalizeIncident(incident));
  }

  return sortIncidents(Array.from(merged.values()));
}

export function saveIncident(incident: Incident) {
  const stored = readStoredIncidents().filter((item) => item.id !== incident.id);
  writeStoredIncidents([normalizeIncident(incident), ...stored]);
}

export function updateIncidentReview(
  incidentId: string,
  updates: {
    reviewStatus?: ReviewStatus;
    reviewerNotes?: string;
  },
) {
  const current = getAllIncidents().find((incident) => incident.id === incidentId);

  if (!current) {
    return;
  }

  saveIncident({
    ...current,
    ...updates,
    reviewerNotes: updates.reviewerNotes ?? current.reviewerNotes,
  });
}

export function getIncidentById(incidentId: string | null) {
  if (!incidentId) {
    return null;
  }

  return getAllIncidents().find((incident) => incident.id === incidentId) ?? null;
}

export function setLastIncidentId(incidentId: string) {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.setItem(LAST_INCIDENT_ID_KEY, incidentId);
  window.localStorage.setItem(UPDATED_AT_KEY, nowIso());
  emitStorageChange();
}

export function getLastIncidentId() {
  if (!canUseStorage()) {
    return null;
  }

  return window.localStorage.getItem(LAST_INCIDENT_ID_KEY);
}

export function getLastUpdatedAt() {
  if (!canUseStorage()) {
    return null;
  }

  return window.localStorage.getItem(UPDATED_AT_KEY);
}

export function getIncidentStoreSnapshot(): string {
  const snapshot: IncidentStoreSnapshot = {
    incidents: getAllIncidents(),
    lastIncidentId: getLastIncidentId(),
    lastUpdatedAt: getLastUpdatedAt(),
  };

  return JSON.stringify(snapshot);
}

export function getSeededIncidentStoreSnapshot(): string {
  const snapshot: IncidentStoreSnapshot = {
    incidents: sortIncidents(mockIncidents.map(normalizeIncident)),
    lastIncidentId: null,
    lastUpdatedAt: null,
  };

  return JSON.stringify(snapshot);
}

export function parseIncidentStoreSnapshot(
  snapshot: string,
): IncidentStoreSnapshot {
  try {
    const parsed = JSON.parse(snapshot) as IncidentStoreSnapshot;
    const incidents = Array.isArray(parsed.incidents) ? parsed.incidents : [];

    return {
      incidents: incidents.map(normalizeIncident),
      lastIncidentId: parsed.lastIncidentId ?? null,
      lastUpdatedAt: parsed.lastUpdatedAt ?? null,
    };
  } catch {
    return {
      incidents: sortIncidents(mockIncidents.map(normalizeIncident)),
      lastIncidentId: null,
      lastUpdatedAt: null,
    };
  }
}

export function resetStoredIncidents() {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.removeItem(INCIDENTS_KEY);
  window.localStorage.removeItem(LAST_INCIDENT_ID_KEY);
  window.localStorage.setItem(UPDATED_AT_KEY, nowIso());
  emitStorageChange();
}

export function subscribeToIncidentStorage(callback: () => void) {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  const handler = () => callback();

  window.addEventListener("storage", handler);
  window.addEventListener(STORAGE_EVENT, handler);

  return () => {
    window.removeEventListener("storage", handler);
    window.removeEventListener(STORAGE_EVENT, handler);
  };
}
