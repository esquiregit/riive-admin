<?php
	require_once 'conn.php';

	class Country {

		public function create_country($country_code, $country_name, $conn){
			try{
				$query = $conn->prepare('INSERT INTO countries(`country_code`, `country_name`, `status`) VALUES(:country_code, :country_name, :status)');
                $query->execute([':country_code' => $country_code, ':country_name' => $country_name, ':status' => 'Active']);

				return true;
			}catch(PDOException $ex){die($ex);
				return false;
			}
		}

		public function read_countries($conn){
			try{
				$query = $conn->prepare('SELECT * FROM countries ORDER BY country_name ASC');
				$query->execute();

				return $query->fetchAll(PDO::FETCH_OBJ);
			}catch(PDOException $ex){}
		}

        public static function read_active_countries($conn){
            try{
                $query = $conn->prepare('SELECT * FROM countries WHERE status = :status ORDER BY country_name ASC');
                $query->execute([':status' => 'Active']);

                return $query->fetchAll(PDO::FETCH_OBJ);
            }catch(PDOException $ex){}
        }

        public static function read_countries_dropdown($conn) {
            try{
                $query = $conn->prepare('SELECT id, country_code, country_name FROM countries WHERE status = :status ORDER BY country_name ASC');
                $query->execute([':status' => 'Active']);

                return $query->fetchAll(PDO::FETCH_OBJ);
            }catch(PDOException $ex){}
        }

        public static function read_regions_by_country($countryID, $conn) {
            try{
                $query = $conn->prepare('SELECT regionID, regionName FROM region_state WHERE countryID = :countryID ORDER BY regionName ASC');
                $query->execute([':countryID' => $countryID]);

                return $query->fetchAll(PDO::FETCH_OBJ);
            }catch(PDOException $ex){}
        }

		public function read_country_name($id, $conn){
			try{
				$query = $conn->prepare('SELECT country_name FROM countries WHERE id = :id');
				$query->execute([':id' => $id]);

				return $query->fetch(PDO::FETCH_OBJ)->country_name;
			}catch(PDOException $ex){}
		}

		public function read_country_by_id($id, $conn){
			try{
				$query  = $conn->prepare('SELECT country_name FROM countries WHERE id = :id');
				$query->execute([':id' => $id]);
                $result = $query->fetch(PDO::FETCH_OBJ);

				return ($result) ? $result->country_name : '';
			}catch(PDOException $ex){}
		}

        public function read_country_by_code($country_code, $conn){
            try{
                $query = $conn->prepare('SELECT * FROM countries WHERE country_code = :country_code');
                $query->execute([':country_code' => $country_code]);

                return $query->fetch(PDO::FETCH_OBJ);
            }catch(PDOException $ex){}
        }

        public function update_country($country_code, $country_name, $id, $conn){
            try{                
                $query = $conn->prepare('UPDATE countries SET country_code = :country_code, country_name = :country_name WHERE id = :id');
                $query->execute([':country_code' => $country_code, ':country_name' => $country_name, ':id' => $id]);

                return true;
            }catch(PDOException $ex){
                return false;
            }
        }

        public function block_country_by_id($id, $conn){
            try{                
                $query = $conn->prepare('UPDATE countries SET status = :status WHERE id = :id');
                $query->execute([':id' => $id, ':status' => 'Inactive']);

                return true;
            }catch(PDOException $ex){
                return false;
            }
        }

        public function unblock_country_by_id($id, $conn){
            try{                
                $query = $conn->prepare('UPDATE countries SET status = :status WHERE id = :id');
                $query->execute([':id' => $id, ':status' => 'Active']);

                return true;
            }catch(PDOException $ex){
                return false;
            }
        }

        public function delete_country_by_code($country_code, $conn){
            try{                
                $query = $conn->prepare('UPDATE countries SET status = :status WHERE country_code = :country_code');
                $query->execute([':status' => 'Inactive', ':country_code' => strtoupper($country_code)]);

                return true;
            }catch(PDOException $ex){
                return false;
            }
        }

        public function is_country_id_used($id, $conn){
            try{
                $query = $conn->prepare('SELECT * FROM countries WHERE id = :id');
                $query->execute([':id' => $id]);

                return $query->rowCount();
            }catch(PDOException $ex){}
        }

        public function is_country_code_used($country_code, $conn){
            try{
                $query = $conn->prepare('SELECT * FROM countries WHERE country_code = :country_code');
                $query->execute([':country_code' => $country_code]);

                return $query->rowCount();
            }catch(PDOException $ex){}
        }

        public function is_this_country_code_used($id, $country_code, $conn){
            try{
                $query = $conn->prepare('SELECT * FROM countries WHERE country_code = :country_code AND id != :id');
                $query->execute([':country_code' => $country_code, ':id' => $id]);

                return $query->rowCount();
            }catch(PDOException $ex){}
        }

        public function is_country_name_used($country_name, $conn){
            try{
                $query = $conn->prepare('SELECT * FROM countries WHERE country_name = :country_name');
                $query->execute([':country_name' => $country_name]);

                return $query->rowCount();
            }catch(PDOException $ex){}
        }

        public function is_this_country_name_used($id, $country_name, $conn){
            try{
                $query = $conn->prepare('SELECT * FROM countries WHERE country_name = :country_name AND id != :id');
                $query->execute([':country_name' => $country_name, ':id' => $id]);

                return $query->rowCount();
            }catch(PDOException $ex){}
        }

	}