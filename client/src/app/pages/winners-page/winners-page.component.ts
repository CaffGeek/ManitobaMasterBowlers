import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '@services/api.service';
import moment from 'moment';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { exportToCsv } from '../../utils/export-to-csv';

type StarWinnerRecord = {
  BowlerId: number;
  Bowler: string;
  SeasonCode: number;
  SeasonDesc: string;
  Division: string;
  TournamentId: number;
  TournamentNumber: number;
  TournamentLocation: string;
  TournamentDetails: string;
};

type WinnersFilterType = 'season' | 'division' | 'location' | 'bowler';

type WinnersFilterOption = {
  key: string;
  type: WinnersFilterType;
  label: string;
  displayLabel: string;
  value: string;
};

@Component({
  selector: 'app-winners-page',
  templateUrl: './winners-page.component.html',
  styleUrls: ['./winners-page.component.css'],
  standalone: false,
})
export class WinnersPageComponent implements OnInit, AfterViewInit {
  displayedColumns: (keyof StarWinnerRecord)[] = [
    'Bowler',
    'SeasonDesc',
    'Division',
    'TournamentNumber',
    'TournamentLocation',
    'TournamentDetails',
  ];
  dataSource = new MatTableDataSource<StarWinnerRecord>([]);
  filterInput = '';
  allFilterOptions: WinnersFilterOption[] = [];
  filteredFilterOptions: WinnersFilterOption[] = [];
  selectedFilters: WinnersFilterOption[] = [];

  @ViewChild(MatSort) sort?: MatSort;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.dataSource.sortingDataAccessor = (item, property) => {
      if (property === 'TournamentDetails') {
        return this.parseDate(item.TournamentDetails);
      }
      return (item as any)[property] ?? '';
    };
    this.dataSource.filterPredicate = (row, filter) => {
      const { seasons, divisions, locations, bowlers } = JSON.parse(filter || '{}') as {
        seasons?: string[];
        divisions?: string[];
        locations?: string[];
        bowlers?: string[];
      };
      const matchesSeason = !seasons?.length || seasons.includes(String(row.SeasonCode));
      const matchesDivision = !divisions?.length || divisions.includes(row.Division);
      const matchesLocation = !locations?.length || locations.includes(this.cleanLocation(row.TournamentLocation));
      const matchesBowler = !bowlers?.length || bowlers.includes(row.Bowler);
      return matchesSeason && matchesDivision && matchesLocation && matchesBowler;
    };

    this.api.starWinners$().subscribe((rows) => {
      this.dataSource.data = rows || [];
      this.allFilterOptions = this.buildFilterOptions(rows || []);
      this.updateFilteredOptions();
      this.applyFilter();
    });
  }

  ngAfterViewInit(): void {
    if (this.sort) {
      this.dataSource.sort = this.sort;
      this.sort.active = 'TournamentDetails';
      this.sort.direction = 'desc';
      this.sort.sortChange.emit({ active: 'TournamentDetails', direction: 'desc' });
    }
  }

  selectFilter(event: MatAutocompleteSelectedEvent): void {
    const option = event.option.value as WinnersFilterOption | null;
    if (!option || this.selectedFilters.some((selected) => selected.key === option.key)) {
      this.filterInput = '';
      this.updateFilteredOptions();
      return;
    }

    this.selectedFilters = [...this.selectedFilters, option];
    this.filterInput = '';
    this.updateFilteredOptions();
    this.applyFilter();
  }

  removeFilter(option: WinnersFilterOption): void {
    this.selectedFilters = this.selectedFilters.filter((selected) => selected.key !== option.key);
    this.updateFilteredOptions();
    this.applyFilter();
  }

  onFilterInputChange(): void {
    this.updateFilteredOptions();
  }

  displayFilterOption(option: WinnersFilterOption | string | null): string {
    return typeof option === 'string' ? option : '';
  }

  applyFilter(): void {
    const filterGroups = this.selectedFilters.reduce(
      (groups, option) => {
        if (option.type === 'season') {
          groups.seasons.push(option.value);
        } else if (option.type === 'division') {
          groups.divisions.push(option.value);
        } else if (option.type === 'location') {
          groups.locations.push(option.value);
        } else if (option.type === 'bowler') {
          groups.bowlers.push(option.value);
        }
        return groups;
      },
      { seasons: [] as string[], divisions: [] as string[], locations: [] as string[], bowlers: [] as string[] }
    );

    this.dataSource.filter = JSON.stringify({
      seasons: filterGroups.seasons,
      divisions: filterGroups.divisions,
      locations: filterGroups.locations,
      bowlers: filterGroups.bowlers,
    });
  }

  exportCsv(): void {
    const hasActiveFilters = this.selectedFilters.length > 0;
    const sourceRows = hasActiveFilters ? this.dataSource.filteredData : this.dataSource.data;
    const columns = ['Bowler', 'SeasonDesc', 'Division', 'TournamentNumber', 'TournamentLocation', 'TournamentDetails'];
    const rows = sourceRows.map((row) => ({
      ...row,
      TournamentDetails: this.parseDate(row.TournamentDetails)
        ? moment(this.parseDate(row.TournamentDetails)).format('MMM DD, YY')
        : row.TournamentDetails,
    }));
    exportToCsv('winners.csv', columns, rows);
  }

  private parseDate(value: string): number {
    if (!value) {
      return 0;
    }
    return moment(value, ['DDMMMMY hh:mm:ss a', 'MMMMDDY hh:mm:ss a', 'MMM D YYYY h:mma']).valueOf() || 0;
  }

  private cleanLocation(value: string): string {
    return (value || '').replace(/\?\?\?/g, '').trim();
  }

  private buildFilterOptions(rows: StarWinnerRecord[]): WinnersFilterOption[] {
    const seasons = rows
      .map((row) => ({
        key: `season:${row.SeasonCode}`,
        type: 'season' as const,
        label: row.SeasonDesc,
        displayLabel: `Season: ${row.SeasonDesc}`,
        value: String(row.SeasonCode),
      }))
      .filter((option, index, all) => all.findIndex((candidate) => candidate.key === option.key) === index)
      .sort((a, b) => b.value.localeCompare(a.value));

    const divisions = rows
      .map((row) => ({
        key: `division:${row.Division}`,
        type: 'division' as const,
        label: row.Division,
        displayLabel: `Division: ${row.Division}`,
        value: row.Division,
      }))
      .filter((option, index, all) => all.findIndex((candidate) => candidate.key === option.key) === index)
      .sort((a, b) => a.label.localeCompare(b.label));

    const locations = rows
      .map((row) => this.cleanLocation(row.TournamentLocation))
      .filter((location) => !!location)
      .map((location) => ({
        key: `location:${location}`,
        type: 'location' as const,
        label: location,
        displayLabel: `Location: ${location}`,
        value: location,
      }))
      .filter((option, index, all) => all.findIndex((candidate) => candidate.key === option.key) === index)
      .sort((a, b) => a.label.localeCompare(b.label));

    const bowlers = rows
      .map((row) => ({
        key: `bowler:${row.Bowler}`,
        type: 'bowler' as const,
        label: row.Bowler,
        displayLabel: `Bowler: ${row.Bowler}`,
        value: row.Bowler,
      }))
      .filter((option, index, all) => all.findIndex((candidate) => candidate.key === option.key) === index)
      .sort((a, b) => a.label.localeCompare(b.label));

    return [...seasons, ...divisions, ...locations, ...bowlers];
  }

  private updateFilteredOptions(): void {
    const selectedKeys = new Set(this.selectedFilters.map((option) => option.key));
    const search = this.filterInput.trim().toLowerCase();

    this.filteredFilterOptions = this.allFilterOptions
      .filter((option) => !selectedKeys.has(option.key))
      .filter((option) => !search || option.displayLabel.toLowerCase().includes(search))
      .slice(0, 25);
  }
}
