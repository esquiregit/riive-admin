export const getDate = () => {
    return new Date();
}

export const getMaxDate = () => {
    const date    = getDate();
    const day     = date.getDate();
    const month   = date.getMonth() < 10 ? '0'+(1+date.getMonth()) : (1+date.getMonth());
    const year    = date.getFullYear();
    
    return year+'-'+month+'-'+day;
}

export const getAcademicYears = () => {
    let arr          = [];
    const date       = getDate();
    const curr_year  = date.getFullYear();
    const start_year = curr_year - 5;
    // const end_year   = curr_year + 5;

    for(let index = start_year; index < curr_year; index++) {
        const year = index+'/'+(index+1);
        arr.push({ label: year, value: year });
    }

    return arr;
    /* 
    public static function get_academic_years() {
        $array        = array();
        $current_year = Date('Y');
        $start_year   = date_format(date_sub(date_create($current_year), date_interval_create_from_date_string('5 years')), 'Y');
        $end_year     = date_format(date_add(date_create($current_year), date_interval_create_from_date_string('5 years')), 'Y');

        for($year = $start_year; $year <= $current_year; $year++) {
            array_push($array, $year . '/' . ($year + 1));
        }
        return $array;
    }
    */

}

// export const todaysDate = () => {
//     const date    = new Date();
//     const day     = date.getDate();
//     const month   = date.getMonth() < 10 ? '0'+(1+date.getMonth()) : (1+date.getMonth());
//     const year    = date.getFullYear();
//     const hour    = date.getHours() < 10 ? '0'+date.getHours() : date.getHours();
//     const minutes = date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes();
//     const seconds = date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds();
    
//     return 
// }