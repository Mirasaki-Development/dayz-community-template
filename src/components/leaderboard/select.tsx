'use client';

import React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { titleCase } from '@/lib/utils';
import { LeaderboardSortValues } from '../../lib/config.types';
import { config } from '../../../config';

export type LeaderboardSelectProps = {
  defaultValue?: string;
  onChange?: (value: string) => void | Promise<void>;
  servers: string[];
};

const LeaderboardSelect = ({
  defaultValue,
  onChange,
  servers,
}: LeaderboardSelectProps) => {
  return (
    <Select defaultValue={defaultValue} onValueChange={(e) => {
      if (onChange) onChange(e);
    }}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a server" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Server</SelectLabel>
          {servers.map((server) => (
            <SelectItem key={server} value={server}>
              {server}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export const LeaderboardSelectSortBy = ({
  defaultValue,
  onChange,
}: {
  defaultValue?: string;
  onChange?: (value: LeaderboardSortValues) => void | Promise<void>;
}) => {
  return (
    <Select defaultValue={defaultValue} onValueChange={(e) => {
      if (onChange) onChange(e as LeaderboardSortValues);
    }}>
      <SelectTrigger className="w-[140px]">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Sort by</SelectLabel>
          {config.cftools.leaderboard.allowedSortValues.map((sortValue) => (
            <SelectItem key={sortValue} value={sortValue}>
              {titleCase(sortValue)}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default LeaderboardSelect;
