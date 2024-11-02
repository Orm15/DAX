# Funciones Básicas de DAX :

## Suma los valores de la columna especificada en la tabla, útil para cálculos de totalización.
```DAX
Total Ventas = SUM(Tabla[Ventas])
```

## Devuelve el promedio de los valores de una columna, útil para métricas de rendimiento o análisis comparativos.
```DAX
Promedio Ventas = AVERAGE(Tabla[Ventas])
```

## COUNT cuenta el número de valores numéricos, mientras que COUNTA cuenta todos los valores no vacíos de una columna.
```DAX
Total Registros = COUNT(Tabla[Id])
Total No Vacíos = COUNTA(Tabla[Columna])
```

## Cuenta el número de valores únicos en una columna, ideal para análisis de clientes únicos, productos únicos, etc.
```DAX
Total Clientes Únicos = DISTINCTCOUNT(Tabla[ClienteID])
```

## Devuelve el valor mínimo o máximo en una columna, útil para rangos y análisis de valores extremos.
```DAX
Valor Mínimo = MIN(Tabla[Precio])
Valor Máximo = MAX(Tabla[Precio])
```

## Cuenta el número de valores únicos en una columna, ideal para análisis de clientes únicos, productos únicos, etc.
```DAX
Total Clientes Únicos = DISTINCTCOUNT(Tabla[ClienteID])
```

# Funciones de Filtrado y Cálculo Condicional

## CALCULATE
### Evalúa una expresión en el contexto modificado por un filtro. Aquí, se filtran las ventas solo del año actual.

```DAX
Ventas Año Actual = CALCULATE(SUM(Tabla[Ventas]), YEAR(Tabla[Fecha]) = YEAR(TODAY()))
```

## FILTER
### Permite aplicar filtros personalizados a una tabla. Aquí, solo se suman las ventas que son mayores a 1000.

```DAX
Ventas Superiores = CALCULATE(SUM(Tabla[Ventas]), FILTER(Tabla, Tabla[Ventas] > 1000))
```

## IF
### Realiza una evaluación condicional y devuelve valores según la condición, útil para clasificaciones básicas.

```DAX
Clasificación Ventas = IF(Tabla[Ventas] > 1000, "Alta", "Baja")
```

## SWITCH
### Permite aplicar múltiples condiciones sin usar varios IF, ideal para categorizar valores específicos.

```DAX
Clasificación Producto = SWITCH(
    Tabla[Producto],
    "Producto A", "Alta Demanda",
    "Producto B", "Demanda Media",
    "Producto C", "Baja Demanda",
    "Desconocido"
)
```

# Funciones de Manejo de Fechas

## YEAR, MONTH, DAY
### Extraen el año, mes y día de una columna de fecha, útiles para descomponer fechas para análisis.
```DAX
Año Venta = YEAR(Tabla[Fecha])
Mes Venta = MONTH(Tabla[Fecha])
Día Venta = DAY(Tabla[Fecha])
```

## DATEDIFF
### Devuelve la diferencia entre dos fechas en días, meses o años, útil para calcular antigüedad o tiempo transcurrido.

```DAX
Días desde la Compra = DATEDIFF(Tabla[FechaCompra], TODAY(), DAY)
```

## DATEADD
### Permite desplazar fechas en un intervalo específico, como para obtener valores del mes anterior.

```DAX
Ventas Mes Anterior = CALCULATE(SUM(Tabla[Ventas]), DATEADD(Tabla[Fecha], -1, MONTH))
```

## EOMONTH
### Devuelve el último día del mes especificado, útil para análisis de fin de periodo.

```DAX
Fin de Mes = EOMONTH(Tabla[Fecha], 0)
```

# Cálculos Avanzados y Acumulativos

## TOTALYTD
### Calcula el total acumulado hasta la fecha del año en curso. Muy útil para reportes de progreso.
```DAX
Ventas Acumuladas Año = TOTALYTD(SUM(Tabla[Ventas]), Tabla[Fecha])
```

## Cumulative Total con EARLIER
### Acumula los valores hasta la fecha actual o una fecha especificada.
```DAX
Total Acumulado = 
CALCULATE(
    SUM(Tabla[Ventas]),
    FILTER(
        ALL(Tabla[Fecha]),
        Tabla[Fecha] <= EARLIER(Tabla[Fecha])
    )
)
```

## RANKX
### Permite clasificar los valores de una columna en orden. Aquí, clasifica los valores de ventas en orden descendente.
```DAX
Ranking de Ventas = RANKX(ALL(Tabla), Tabla[Ventas], , DESC, Dense)
```

## ALLSELECTED
### Mantiene solo los filtros aplicados en la visualización. Ideal para crear métricas dinámicas en Power BI que respondan a los filtros aplicados.
```DAX
Total Filtrado = CALCULATE(SUM(Tabla[Ventas]), ALLSELECTED(Tabla))
```

# Análisis de Periodos de Tiempo

## SAMEPERIODLASTYEAR
### Devuelve los valores del mismo periodo del año anterior, útil para comparaciones anuales directas.
```DAX
Ventas Año Pasado = CALCULATE(SUM(Tabla[Ventas]), SAMEPERIODLASTYEAR(Tabla[Fecha]))
```

## PREVIOUSMONTH
### Devuelve los valores del mes anterior, útil para reportes comparativos mensuales.
```DAX
Ventas Mes Anterior = CALCULATE(SUM(Tabla[Ventas]), PREVIOUSMONTH(Tabla[Fecha]))
```

## DATESYTD
### Calcula las ventas desde el inicio del año hasta la fecha actual.
```DAX
Ventas YTD = CALCULATE(SUM(Tabla[Ventas]), DATESYTD(Tabla[Fecha]))
```

# Utilidades :

## Tabla Calendario Completa
### Este código crea una tabla calendario básica que incluye columnas como el año, trimestre, mes, día, entre otras.
```DAX
TablaCalendario = 
VAR FechaInicio = DATE(2020, 1, 1)   -- Cambia la fecha de inicio según tu necesidad
VAR FechaFin = DATE(2025, 12, 31)    -- Cambia la fecha de fin según tu necesidad
RETURN
ADDCOLUMNS(
    CALENDAR(FechaInicio, FechaFin),
    "Año", YEAR([Date]),
    "Mes", MONTH([Date]),
    "Día", DAY([Date]),
    "NombreMes", FORMAT([Date], "MMMM"),
    "NombreDía", FORMAT([Date], "dddd"),
    "Trimestre", QUARTER([Date]),
    "Año-Mes", FORMAT([Date], "YYYY-MM"),
    "Fin de Mes", EOMONTH([Date], 0),
    "Año Fiscal", IF(MONTH([Date]) >= 7, YEAR([Date]) + 1, YEAR([Date])),
    "Trimestre Fiscal", 
         IF(MONTH([Date]) >= 7, 
            QUARTER([Date]) - 2, 
            QUARTER([Date]) + 2),
    "Es Fin de Semana", IF(WEEKDAY([Date], 2) > 5, TRUE, FALSE)
)
```

## Días Laborables
### Agrega una columna para identificar si un día es laborable o no, excluyendo fines de semana y festivos.
```DAX
Día Laborable = 
IF(
    TablaCalendario[Es Fin de Semana] = FALSE 
    && NOT( TablaCalendario[Date] IN {DATE(2024, 1, 1), DATE(2024, 12, 25)} ), 
    TRUE, 
    FALSE
)
```

## Comparación de Crecimiento Anual
### Calcula la variación porcentual entre el año actual y el año pasado.
```DAX
Crecimiento Anual = 
DIVIDE(
    [Total Ventas] - [Ventas Año Anterior],
    [Ventas Año Anterior],
    0
)
```

## Rango de Fechas Personalizado
### Permite definir un rango específico para cálculos de ventas, adaptado a cualquier periodo personalizado.
```DAX
Ventas Rango Personalizado = 
CALCULATE(
    [Total Ventas],
    DATESBETWEEN(TablaCalendario[Date], DATE(2024, 1, 1), DATE(2024, 12, 31))
)
```

## Expresiones Variables (VAR) para Cálculos Complejos
### La declaración de variables en DAX (VAR) ayuda a simplificar expresiones y mejora el rendimiento, ya que evalúa un cálculo una sola vez.
```DAX
Ventas Promedio Mes = 
VAR VentasTotales = [Total Ventas]
VAR MesesActivos = COUNTROWS(FILTER(Calendario, Calendario[Date] <= TODAY()))
RETURN DIVIDE(VentasTotales, MesesActivos, 0)
```

## Análisis de Datos con Funciones Estadísticas
### 1.- Función AVERAGEX, MEDIANX, PERCENTILEX.INC: Útiles para cálculos estadísticos avanzados, como promedios, medianas y percentiles dentro de un grupo de datos.

### 2.- Distribuciones y Agrupaciones: Usa GROUPBY y SUMMARIZE para crear tablas y resúmenes de datos agregados según agrupaciones personalizadas.

```DAX
Total Ventas por Región = SUMMARIZE(Ventas, Ventas[Región], "Ventas Totales", SUM(Ventas[Monto]))

```

