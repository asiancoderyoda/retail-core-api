Planned AI input contract for procurement planning of "Egg" ingredient, which is used in "Chicken Roll" and "Egg Burger" products. The input includes detailed information about the planning item, inventory position, demand context, stock policy, supply plan, supplier options, pipeline context, risk signals, and historical learning from previous AI runs. This comprehensive data will enable the AI to generate an informed procurement plan to ensure optimal inventory levels while minimizing costs and risks.

```
{
  "planningItem": {
    "id": "PI_EGG",
    "code": "EGG",
    "name": "Egg",
    "planningType": "ingredient",
    "unitOfMeasure": "pcs",
    "shelfLifeDays": 7,
    "maxStorageCapacity": 500,
    "derivedFromProductDemand": true,
    "linkedDemandDrivers": [
      {
        "productCode": "CHICKEN_ROLL",
        "productName": "Chicken Roll",
        "avgDailySales": 80,
        "bomConsumptionPerUnit": 1
      },
      {
        "productCode": "EGG_BURGER",
        "productName": "Egg Burger",
        "avgDailySales": 20,
        "bomConsumptionPerUnit": 1
      }
    ]
  },

  "inventoryPosition": {
    "onHand": 50,
    "reserved": 10,
    "pipelineInbound": 30,
    "availableToUse": 70,
    "inventoryPosition": 70,
    "lastUpdatedAt": "2026-04-27T08:30:00Z"
  },

  "demandContext": {
    "historicalAvgDailyConsumption": 100,
    "forecastAvgDailyDemand": 110,
    "forecastP50": 100,
    "forecastP90": 130,
    "demandStdDev": 25,
    "variability": 0.25,
    "seasonalityIndex": 1.12,
    "trendDirection": "increasing",
    "forecastHorizonDays": 7
  },

  "stockPolicy": {
    "serviceLevel": 0.95,
    "reviewPeriodDays": 2,
    "leadTimeDaysWeighted": 3.6,
    "leadTimeStdDev": 1.1,
    "safetyStock": 80,
    "cycleStock": 200,
    "reorderPoint": 380,
    "targetStock": 480
  },

  "supplyPlan": {
    "shortageGap": 310,
    "daysToStockout": 0.7,
    "stockHealth": "critical",
    "recommendedCoverageDays": 4
  },

  "supplierOptions": [
    {
      "supplierId": "SUP_A",
      "supplierName": "FreshFarm Supplies",
      "leadTimeDays": 3,
      "moq": 50,
      "maxCapacity": 200,
      "allocationPct": 0.7,
      "unitPrice": 6,
      "fillRate": 0.92,
      "reliabilityScore": 0.9,
      "activeDisruption": false
    },
    {
      "supplierId": "SUP_B",
      "supplierName": "Metro Eggs",
      "leadTimeDays": 5,
      "moq": 30,
      "maxCapacity": 100,
      "allocationPct": 0.3,
      "unitPrice": 5.8,
      "fillRate": 0.78,
      "reliabilityScore": 0.72,
      "activeDisruption": true
    }
  ],

  "pipelineContext": {
    "openPurchaseOrders": [
      {
        "poId": "PO_1002",
        "supplierId": "SUP_A",
        "qty": 30,
        "expectedArrival": "2026-04-29"
      }
    ],
    "totalInboundQty": 30
  },

  "riskSignals": {
    "supplierDisruptionRisk": "medium",
    "perishabilityRisk": "high",
    "storageCapacityRisk": "low",
    "forecastUncertaintyRisk": "medium"
  },

  "historicalLearning": {
    "lastFiveAiRuns": [
      {
        "recommendedQty": 250,
        "approved": true,
        "realizedScore": 0.92
      },
      {
        "recommendedQty": 180,
        "approved": false,
        "realizedScore": 0.4
      }
    ],
    "repeatedFailureQuantities": [180],
    "successfulSupplierPatterns": ["SUP_A"]
  }
}
```