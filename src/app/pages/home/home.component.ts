import { Component, OnInit } from '@angular/core';

import { ClientService } from './../../services/client.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  indicators: any = null;
  accountsByMonth: any = null;
  constructor(private service: ClientService) {}

  ngOnInit(): void {
    this.findSummary();
  }

  findSummary() {
    this.service.findSummary().subscribe((result) => {
      console.log(result.body);
      this.indicators = result.body;
      this.accountsByMonth = result.body.accountsByMonth;
    });
  }

  pie() {
    return {
      textStyle: {
        fontSize: 10,
        fontWeight: 'bold',
        fontFamily: 'Helvetica',
      },
      color: ['#4caf50', '#202b44', '#eb7f0c'],
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
      },
      legend: {
        right: 100,
        top: 40,
        fontSize: 10,
        orient: 'vertical',
        labels: ['Finalizado', 'Em andamento', 'Em atraso'],
      },
      series: [
        {
          name: 'Projetos',
          type: 'pie',
          left: -95,
          radius: ['0%', '80%'],
          center: ['50%', '50%'],
          data: [
            {
              value: Number(this.indicators.projects['FINISHED']),
              name: 'Finalizado',
            },
            {
              value: Number(this.indicators.projects['INITIALIZED']),
              name: 'Em andamento',
            },
            {
              value: Number(this.indicators.projects['OVERDUE']),
              name: 'Em atraso',
            },
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
            },
          },
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center',
          },
          emphasis: {
            label: {
              show: false,
              fontSize: 10,
              fontWeight: 'bold',
            },
          },
        },
      ],
    };
  }

  line() {
    return {
      color: ['#202b44'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          data: [
            'Janeiro',
            'Fevereiro',
            'Março',
            'Abril',
            'Maio',
            'Junho',
            'Julho',
            'Agosto',
            'Setembro',
            'Outubro',
            'Novembro',
            'Dezembro',
          ],
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
        },
      ],
      series: [
        {
          name: 'Clientes',
          type: 'bar',
          barWidth: '50%',
          data: this.accountsByMonth
            ? this.accountsByMonth.values
            : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
      ],
    };
  }
}
