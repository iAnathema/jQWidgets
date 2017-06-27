﻿import { Component, ViewChild } from '@angular/core';

import { jqxGridComponent } from '../../../../../jqwidgets-ts/angular_jqxgrid'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})

export class AppComponent {
    @ViewChild('myGrid') myGrid: jqxGridComponent;

    source: any =
    {
        datatype: 'json',
        url: '../sampledata/rows_and_columns.txt'
    };

    dataAdapter: any = new jqx.dataAdapter(this.source, {
        autoBind: true,
        downloadComplete: (data: any): void => {
            let columns = data[0].columns;
            let rows = data[1].rows;
            let gridAdapter = new jqx.dataAdapter({
                datafields: [
                    { name: 'id', type: 'number' },
                    { name: 'name', type: 'string' },
                    { name: 'type', type: 'string' },
                    { name: 'calories', type: 'int' },
                    { name: 'totalfat', type: 'string' },
                    { name: 'protein', type: 'string' }
                ],
                id: 'id',
                localdata: rows
            });

            this.myGrid.hideloadelement();
            this.myGrid.beginupdate();
            this.myGrid.setOptions
                ({
                    source: gridAdapter,
                    columns: columns
                });
            this.myGrid.endupdate();
        }
    });
}