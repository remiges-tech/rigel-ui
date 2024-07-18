import {
  ChangeDetectionStrategy,
  Component,
  Input,
  SimpleChange,
} from '@angular/core';
import { Field } from 'src/interfaces/common-interfaces';
import { CommonService } from 'src/services/common.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class PaginationComponent {
  @Input({ required: true }) data: Field[] = [];
  @Input({ required: true }) totalEntities: number = 0;
  paginatedData?: any[];
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50, 100];
  currentPage = 1;
  totalPages: number = 1;

  constructor(public _commonService: CommonService) {}

  ngOnInit() {
    this.updatePaginatedData();
  }

  ngOnChanges(change: SimpleChange) {
    if (change.previousValue == change.currentValue) {
      this.updatePaginatedData();
    }
  }

  onPageSizeChange(event: any) {
    this.pageSize = +event.target.value;
    this.currentPage = 1;
    this.updatePaginatedData();
  }

  updatePaginatedData() {
    const totalPageCount = Math.ceil(this.totalEntities / this.pageSize);
    this.totalPages = totalPageCount < 1 ? 1 : totalPageCount;
    if (this.totalPages == 1) {
      this.currentPage = 1;
    }
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedData = this.data.slice(start, end);
  }

  goToFirstPage() {
    this.currentPage = 1;
    this.updatePaginatedData();
  }

  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedData();
    }
  }

  goToNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedData();
    }
  }

  goToLastPage() {
    this.currentPage = this.totalPages;
    this.updatePaginatedData();
  }
}
