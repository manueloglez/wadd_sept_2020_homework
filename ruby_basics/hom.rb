def filter(arr)
  raise ArgumentError.new('Argument must be array') unless arr.is_a?(Array)
  result = []
  arr.each {|el| result.push(el) if yield(el) }
  result
end
